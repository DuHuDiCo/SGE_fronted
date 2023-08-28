export type Departamento =

    {
      id: 0,
      name: string,
      description: string,
      cityCapitalId: 0,
      municipalities: 0,
      surface: 0,
      population: 0,
      phonePrefix: string,
      countryId: 0,
      cityCapital: {
        id: 0,
        name: string,
        description: string,
        surface: 0,
        population: 0,
        postalCode: string,
        departmentId: 0,
        department: string,
        touristAttractions: [
          {
            id: 0,
            name: string,
            description: string,
            images: [
              string
            ],
            latitude: string,
            longitude: string,
            cityId: 0,
            city: string
          }
        ],
        presidents: [
          {
            id: 0,
            image: string,
            name: string,
            lastName: string,
            startPeriodDate: {
              year: 0,
              month: 0,
              day: 0,
              dayOfWeek: 0,
              dayOfYear: 0,
              dayNumber: 0
            },
            endPeriodDate: {
              year: 0,
              month: 0,
              day: 0,
              dayOfWeek: 0,
              dayOfYear: 0,
              dayNumber: 0
            },
            politicalParty: string,
            description: string,
            cityId: 0,
            city: string
          }
        ]
      },
      country: {
        id: 0,
        name: string,
        description: string,
        stateCapital: string,
        surface: 0,
        population: 0,
        languages: [
          string
        ],
        timeZone: string,
        currency: string,
        currencyCode: string,
        currencySymbol: string,
        isoCode: string,
        internetDomain: string,
        phonePrefix: string,
        radioPrefix: string,
        aircraftPrefix: string,
        subRegion: string,
        region: string,
        borders: [
          string
        ],
        flags: [
          string
        ]
      },
      cities: [
        {
          id: 0,
          name: string,
          description: string,
          surface: 0,
          population: 0,
          postalCode: string,
          departmentId: 0,
          department: string,
          touristAttractions: [
            {
              id: 0,
              name: string,
              description: string,
              images: [
                string
              ],
              latitude: string,
              longitude: string,
              cityId: 0,
              city: string
            }
          ],
          presidents: [
            {
              id: 0,
              image: string,
              name: string,
              lastName: string,
              startPeriodDate: {
                year: 0,
                month: 0,
                day: 0,
                dayOfWeek: 0,
                dayOfYear: 0,
                dayNumber: 0
              },
              endPeriodDate: {
                year: 0,
                month: 0,
                day: 0,
                dayOfWeek: 0,
                dayOfYear: 0,
                dayNumber: 0
              },
              politicalParty: string,
              description: string,
              cityId: 0,
              city: string
            }
          ]
        }
      ],
      regionId: 0,
      region: {
        id: 0,
        name: string,
        description: string,
        departments: [
          string
        ]
      },
      naturalAreas: [
        {
          id: 0,
          areaGroupId: 0,
          categoryNaturalAreaId: 0,
          name: string,
          departmentId: 0,
          daneCode: 0,
          landArea: 0,
          maritimeArea: 0,
          department: string,
          categoryNaturalArea: {
            id: 0,
            name: string,
            description: string,
            naturalAreas: [
              string
            ]
          }
        }
      ],
      maps: [
        {
          id: 0,
          name: string,
          description: string,
          departmentId: 0,
          urlImages: [
            string
          ],
          urlSource: string,
          department: string
        }
      ]
    }