// import RealtimeDriverModel from '../database/models/RealTimeDrivers';
// const changeStream = RealtimeDriverModel.watch(
//     [{
//         $match: {
//             'operationType': 'update',
//             'fullDocument.isOnline': 'true',
//             'fullDocument.isOnsline': 'false'
//         },
//     }],
//     {
//       fullDocument: "updateLookup"
//     }
//   );