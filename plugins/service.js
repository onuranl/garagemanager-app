import CustomerService from '~/services/CustomerService'
import JobTypeService from '~/services/JobTypeService'
import JobService from '~/services/JobService'
import StoreService from '~/services/StoreService'
import ProductService from '~/services/ProductService'

export default (ctx, inject) => {
  inject('services', {
    customer: CustomerService(ctx),
    jobtypes: JobTypeService(ctx),
    job: JobService(ctx),
    store: StoreService(ctx),
    product: ProductService(ctx),
  })
}
