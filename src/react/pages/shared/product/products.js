import React, { useState, useMemo, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import _uniqBy from 'lodash/uniqBy'
import axios from "axios"
import _map from 'lodash/map'

import Loading from '../../../Components/Loading'
import Error from '../../../Components/Error'

import ToolbarComponent from '../../../Components/Shared/Product/Toolbar'
import ProductComponent from '../../../Components/Shared/Product/Product'
import ProductsComponent from '../../../Components/Shared/Product/Products'
import PopupComponent from "../../../Components/Shared/Popup"

import { useHTTP } from '../../../tools/hooks/http'
import { buildUrl } from '../../../tools/functions/query'
import { BASE_URL, PRODUCT, COMPANY, GET, CONSULTATION } from '../../../../config/routes'

import productContext from '../../../tools/state/context/product-context'


const Products = ({ allowActions, customer }) => {
  const [filters, setFilters] = useState([])
  const [redirect, setRedirect] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [activePopup, setActivePopup] = useState(null)
	const [popupData, setPopupData] = useState({})

	const handlePopupUpdate = ({ target }) => {
		setPopupData({ ...popupData, [target.name]: target.value })
  }
	const handlePopup = type => setActivePopup(type)
  

  const [loading, products, error] = useHTTP(buildUrl(BASE_URL + PRODUCT + GET, null, filters), [filters])

  const companies = useHTTP(BASE_URL + COMPANY + GET, [])[1]
  const categories = useMemo(() => {
    return _uniqBy(products, 'category').map(uniqByCategory => uniqByCategory.category)
  }, [products])


  const handleSelectFilter = ({ target }) => setFilters({ ...filters, [target.name]: target.value })

  const handleSelectProduct = stringified => {
    const product = JSON.parse(stringified)
    setSelectedProduct(product)
  }

  const context = useContext(productContext)

  const makeConsultation = () => {
    context.addProduct(selectedProduct)
    setRedirect('/customer/chat')
  }

  const makeOrder = () => {
    context.addProduct(selectedProduct)
    axios.get(buildUrl(BASE_URL + CONSULTATION + GET, null, { product: selectedProduct._id, customer: customer._id }))
      .then(res => {
        const consultants = res.data.data.map(consultation => {
          return { value: consultation.consultant._id, label: consultation.consultant.fullname }
        })

        setActivePopup({
          type: 'order',
          title: `Ordering ${product.title} Redirect to: ${product.company.website}/${product._id}`,
          structure: [
            {
              name: 'count',
              label: 'Quantity',
              type: 'number',
              icon: 'list-ol'
            },
            {
              name: 'consultant',
              label: 'The most useful consultant',
              type: 'select',
              options: _uniqBy(consultants, 'value')
            }
          ]
        })
      })
      .catch(err => console.log(err.response))
    // setRedirect('/customer/')

  }

  console.log(activePopup);

  if (redirect) return <Redirect to={redirect} />

  return (
    <div className='products-wrapper'>
      <div className='filter animated-slide-up'>
        <ToolbarComponent
          filters={filters}
          handleSelectFilter={handleSelectFilter}
          companies={companies}
          categories={categories}
        />
      </div>
      <div className='products animated-slide-up'>
        {loading ? <Loading /> :
          error ? <Error error={error} /> :
            <ProductsComponent
              products={products}
              handleSelectProduct={handleSelectProduct}
            />
        }
      </div>
      <div className='selected'>
        {selectedProduct &&
          <ProductComponent
            product={selectedProduct}
            allowActions={allowActions}
            makeConsultation={makeConsultation}
            makeOrder={makeOrder}
          />}
      </div>
      {activePopup && <PopupComponent
				title={activePopup.title}
				structure={activePopup.structure}
				formData={popupData}
				handleUpdate={handlePopupUpdate}
				handleSubmit={submitPopupHandler}
				handlePopup={handlePopup}
			/>}
    </div>
  )
}


export default Products