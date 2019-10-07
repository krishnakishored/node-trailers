const fs = require('fs')
// const csv = require('fast-csv')
const parse = require('csv-parse')
const _ = require('lodash')
const path = require('path')
const jsonfile = require('jsonfile')


const DEV_ID = "dev_id"

/*

reflat;reflon;refFloor;refRoom;cpslat;cpslon;cpsFloor;cpsRoom;pressure;error;scantime;wifis...;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
55.710926;13.210205;0;point1;55.71113;13.21045;0;;1000.09;27.38796965;03.04.2019 15:18;wifi=70:3a:0e:a7:88:e1,,-88;a8:bd:27:24:e7:81,,-84;70:3a:0e:a7:81:22,,-84;70:3a:0e:a7:81:21,,-83;70:3a:0e:a7:8a:e0,,-83;70:3a:0e:a7:8a:e2,,-83;a8:bd:27:24:e8:61,,-82;70:3a:0e:9b:5b:22,,-78;70:3a:0e:9b:5b:20,,-77;70:3a:0e:9b:5b:21,,-76;b4:5d:50:ea:ab:d1,,-74;b4:5d:50:ea:ab:d0,,-74;b4:5d:50:ea:ab:d2,,-74;b4:5d:50:ea:ab:c0,,-71;b4:5d:50:ea:ab:c2,,-70;b4:5d:50:ea:ab:c1,,-67;06:d6:aa:09:e4:e6,,-41;;;;;;;;;;;;;;;;;;;;;

*/

const UNCERTAINTY_HORIZONTAL = 5.0
const UNCERTAINTY_VERTICAL = 5.0
const DEFAULT_FLOOR = 0
const DEFAULT_CONFIDENCE = 0.67
const DEFAULT_FREQUENCY = 2000


//Values not provided
const key = 0
const date = new Date()
const epoch = date.valueOf()
const DEFAULT_SPEED = 5
const DEFAULT_ALT = 0
const DEFAULT_SSID = "WEEK_2_LUND_UNI"

function saveSurvey (result, srcPath) {
  const { dir, name } = path.parse(srcPath)
  const resultPath = path.join(dir, name + '.json')
  jsonfile.writeFileSync(resultPath, result)
}


function toSurveyRecords(fileName) {
  // Other options for streamToPromise
  // https://github.com/spion/promise-streams
  // https://github.com/bendrucker/stream-to-promise
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(fileName) === false) {
      reject(Error(`${fileName} not found`))
    }
    console.log('Processing file', fileName)
    // const surveyRecords = {}
    const surveyRecords = {}
    const stream = fs.createReadStream(fileName)

    const parser = parse({delimiter:';'})
    // const output = []
    let key = 0
    parser.on('readable', function(){
        let row = 0

        while (row = parser.read()) {
            // surveyRecords[key++]= record
            surveyRecords[key] = {
              state: {
                epoch,
                confidence: DEFAULT_CONFIDENCE,
                speed: DEFAULT_SPEED,
                shape: {
                  type: 31,
                  lat: +row[0],
                  lon: +row[1],
                  alt: DEFAULT_ALT,
                  radius: Math.sqrt(UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL + UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL),
                  vert: UNCERTAINTY_VERTICAL
                }
              },
              floor: +row[2],
              observations: {
                observations: []
              }
          }
          // const ssidArray = bytes(data[0])
          const ssidArray = DEFAULT_SSID
          const ssid = _.range(33).map((currentValue, index) => ssidArray[index] || 0)

          // extract an array of mac_addr and corresponding rss      
          let regExpEnd = new RegExp('/' + "+$"); // -> /\/+$/
          const macaddr_rss_list = row.slice(11).join('/').replace('wifi='," ").replace(regExpEnd,"").split('/')
          
          // console.log(macaddr_rss_list)
          // console.log(surveyRecords) 
          // console.log(key,surveyRecords[key])
          
          
          // const name = ((surveyRecords || {}).key || {}).observations;
          // console.log(name)
          macaddr_rss_list.forEach(element => {
            item = element.split(",,")
            
            // console.log(element[0].split(':').map(x => parseInt(x, 16)))
            surveyRecords[key].observations.observations.push({
              type: 22,
              epoch,
              mac: item[0].split(':').map(x => parseInt(x, 16)),
              ssid,
              rss: -item[1],
              freq: DEFAULT_FREQUENCY,
              uncert: 1
            })
            
            // console.log(key.toString(),element)
            //console.log(Object.keys(surveyRecords))

            // Object.keys(surveyRecords).forEach(key => {
            //     surveyRecords[key].observations.observations.push({
            //       type: 22,
            //       epoch,
            //       mac: element[0].split(':').map(x => parseInt(x, 16)),
            //       ssid,
            //       rss: -element[1],
            //       freq: DEFAULT_FREQUENCY,
            //       uncert: 1
            //     })
            //   console.log(surveyRecords[key].observations.observations)
            // });

            // console.log(surveyRecords[key].observations)
            // surveyRecords[key].observations.observations.push({
            //   type: 22,
            //   epoch,
            //   mac: element[0].split(':').map(x => parseInt(x, 16)),
            //   ssid,
            //   rss: -element[1],
            //   freq: DEFAULT_FREQUENCY,
            //   uncert: 1
            // })
          });
          key=key+1
        }
        // console.log(key, surveyRecords[key])
        // console.log('\n')
        
        // console.log(surveyRecords[1])
        console.log('\n')
    })
    
    // Catch any error
    parser.on('error', function(err){
        console.error(err.message)
    })

    console.log(surveyRecords)
    parser.on('end', () => resolve(Object.values(surveyRecords)))
    parser.on('error', reject)


    /*
    const csvStream = csv({delimiter:';'})
      .on('data', function (data) {
        const dropPin = new Set()
        dropPin.add([data[0], data[1]])
        dropPin.forEach(function (value) {
          // console.log(value);
          surveyRecords[value] = {
            state: {
              epoch,
              confidence: DEFAULT_CONFIDENCE,
              speed: DEFAULT_SPEED,
              shape: {
                type: 31,
                lat: +data[1],
                lon: +data[2],
                alt: DEFAULT_ALT,
                radius: Math.sqrt(UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL + UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL),
                vert: UNCERTAINTY_VERTICAL
              }
            },
            floor: +data[2],
            observations: {
              observations: []
            }
          }
          // const ssidArray = bytes(data[0])
          const ssidArray = DEFAULT_SSID
          const ssid = _.range(33).map((currentValue, index) => ssidArray[index] || 0)

          //extract wifi and rss
          console.log(data[11])

          // if (data[5] !== undefined) {
          //   surveyRecords[value].observations.observations.push({
          //     type: 22,
          //     epoch,
          //     mac: data[5].split(':').map(x => parseInt(x, 16)),
          //     ssid,
          //     rss: -data[4],
          //     freq: DEFAULT_FREQUENCY,
          //     uncert: 1
          //   })
          // }

        });
      })
      .on('end', () => resolve(Object.values(surveyRecords)))
      .on('error', reject)

    */  
    stream.pipe(parser)
    stream.resume()
  })
}



async function convertFromCombain (fileName) {
  const records = await toSurveyRecords(fileName)
  // console.log(records)
  const name = path.basename(fileName, '.csv')
  const survey = {
    surveyid:"UUID",
    // surveyid: uuid.v4(),
    part: 0,
    type: 'type_uri',
    source: 'combain_surveys',
    veracity: 0.9,
    info: {
      name,
      flrmax: 0,
      flrmin: 0,
      appid: 'slam-scripts',
      appver: '1.0.0',
      createdate: '2019-04-16T00:00:00Z'
    },
    records
  }
  return saveSurvey({ devid: DEV_ID, survey }, fileName)
}


// module.exports = main

file = './data/sample.csv'
convertFromCombain(file)