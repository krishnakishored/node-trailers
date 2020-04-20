curl --location --request POST 'https://apis.location.studio/ilp/positioning/v1.2/calculate' \
--header 'api_key: CLnVXKYwRCGd87xQqH0MU34dNQPuJUze_zj9PiDl' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
        "typeShape": 31,
        "encObs": 0,
        "devid": "Postman ILP Test Suite",
        "observations": {
            "observations": [
                {
                    "epoch": "2020-04-13T07:29:55.795Z",
                    "mac": [
                        108,
                        114,
                        32,
                        207,
                        133,
                        34
                    ],
                    "rss": 45,
                    "type": 14
                },
                {
                    "epoch": "2020-04-13T07:29:55.795Z",
                    "mac": [
                        28,
                        95,
                        43,
                        98,
                        20,
                        109
                    ],
                    "rss": 65,
                    "type": 14
                },
                {
                    "epoch": "2020-04-13T07:29:55.795Z",
                    "mac": [
                        200,
                        58,
                        53,
                        50,
                        215,
                        112
                    ],
                    "rss": 91,
                    "type": 14
                },
                {
                    "epoch": "2020-04-13T07:29:55.795Z",
                    "mac": [
                        108,
                        114,
                        32,
                        67,
                        81,
                        31
                    ],
                    "rss": 84,
                    "type": 14
                }
            ]
       }
}'