import CustomerService from '~/services/CustomerService'
import VehicleService from '~/services/VehicleService'
import JobTypeService from '~/services/JobTypeService'
import JobService from '~/services/JobService'
import StoreService from '~/services/StoreService'
import ProductService from '~/services/ProductService'
import DateService from '~/services/DateService'
import SupplierService from '~/services/SupplierService'
import PurchaseService from '~/services/PurchaseService'
import SellService from '~/services/SellService'
import RoleService from '~/services/RoleService'
import OfferService from '~/services/OfferService'

export default (ctx, inject) => {
  inject('services', {
    customer: CustomerService(ctx),
    vehicle: VehicleService(ctx),
    jobtypes: JobTypeService(ctx),
    job: JobService(ctx),
    store: StoreService(ctx),
    product: ProductService(ctx),
    date: DateService(ctx),
    supplier: SupplierService(ctx),
    purchase: PurchaseService(ctx),
    sell: SellService(ctx),
    offer: OfferService(ctx),
    role: RoleService(ctx),
  })
}
