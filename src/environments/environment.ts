// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	//apiEndpoint: "http://172.20.10.9:5000/api",
	//apiEndpoint: "http://localhost:3083/api",
	apiEndpoint: "https://api.kornevaya.ru/api",
	//wsEndpoint: "ws://localhost:5000/notifications",
	wsEndpoint: "wss://api.kornevaya.ru/notifications",
	production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
