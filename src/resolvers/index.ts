import user from './users.resolver'
import drivers from './driver.resolver'
import realtime from './realtime.driver.resolver'
import calculateFare from './calculateFare.resolver'
import emailnot from './email.notifier.resolver'
import estimatePrice from './estimate.price.resolver'
import formulas from './formula.resolver'
import makingOrder from './making.order.resolver'
import notes from './notes.resolver'
import shipments from './shipment.resolver'
import truckOrder from './truck.order.resolver'
import vehicle from './vehicle.resolver'

export default [
  user,
  vehicle,
  truckOrder,
  shipments,
  notes,
  makingOrder,
  formulas,
  estimatePrice,
  emailnot,
  calculateFare,
  realtime,
  drivers
]