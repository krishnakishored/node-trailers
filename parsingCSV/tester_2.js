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
const DEFAULT_SSID = "WEEK_1_LUND_UNI"

function saveSurvey(result, srcPath) {
  const {
    dir,
    name
  } = path.parse(srcPath)
  const resultPath = path.join(dir, name + '.json')
  const content = JSON.stringify(result);

  jsonfile.writeFileSync(resultPath, content)
  // jsonfile.writeFile(resultPath, content)

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
    const surveyRecords = new Map()
    const macAddrData = []
    const stream = fs.createReadStream(fileName)

    const parser = parse({
      delimiter: ',',
      skip_lines_with_error: true
    })

    parser.on('readable', function () {
      let row = 0
      while (row = parser.read()) {
        const {lines, records} = this.info
        console.info(`Current state is ${lines} lines and ${records} records.`)
        if ((row[5] !== "") && (!isNaN(row[1]) && !isNaN(row[2]))  ){ //ignore rows without mac address, or invalid lat,lon (this ignores the csv header too)
          const key = row[1] + '|' + row[2]
          surveyRecords[key] = {
            state: {
              epoch,
              confidence: DEFAULT_CONFIDENCE,
              speed: DEFAULT_SPEED,
              shape: {
                type: 31,
                lat: +row[1],
                lon: +row[2],
                alt: DEFAULT_ALT,
                radius: Math.sqrt(UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL + UNCERTAINTY_HORIZONTAL * UNCERTAINTY_HORIZONTAL),
                vert: UNCERTAINTY_VERTICAL
              }
            },
            floor: DEFAULT_FLOOR,
            observations: {
              observations: []
            }
          }
          // const ssidArray = bytes(data[0])
          const ssidArray = DEFAULT_SSID
          const ssid = _.range(33).map((currentValue, index) => ssidArray[index] || 0)

          const temp_obj = [key, {
            type: 22,
            epoch,
            mac: row[5].split(':').map(x => parseInt(x, 16)),
            ssid,
            rss: -row[4],
            freq: DEFAULT_FREQUENCY,
            uncert: 1
          }]
          macAddrData.push(temp_obj)
        }
      }

      macAddrData.forEach(element => {
          surveyRecords[element[0]].observations.observations.push(element[1])
      });
    })

    parser.on('end', () => resolve(Object.values(surveyRecords)))
    parser.on('error', reject)

    stream.pipe(parser)
    stream.resume()
  })
}



async function convertFromCombain(fileName) {
  const records = await toSurveyRecords(fileName)
  // console.log(records)
  const name = path.basename(fileName, '.csv')
  const survey = {
    surveyid: "UUID",
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
  return saveSurvey({
    devid: DEV_ID,
    survey
  }, fileName)
}


// module.exports = main

// file = './data/sample.csv'
file = `./data/WifiPositionsMAC_LTH.csv`
convertFromCombain(file)