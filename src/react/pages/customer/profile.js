import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ProfileComponent } from './components/Profile'
import { buildUrl } from '../../tools/functions/query'
import { BASE_URL, GET, CUSTOMER } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'

import { useHTTP } from '../../tools/hooks/http'

const Profile = ({ customer }) => {
  const [quotaLoading, quota, quotaError] = useHTTP(`${BASE_URL}customer/list/${customer._id}/quota`, [customer]);
  const [loading, orders, error] = useHTTP(`${BASE_URL}order/listByCustomer/${customer._id}`, [customer]);

  const [flattenedOrders, setFlattenedOrders] = useState(null);

  useEffect(() => {
    if (orders) {
      setFlattenedOrders(orders.map((order) => {
        return {
          productTitle: order.product.title,
          companyTitle: order.product.company.title,
          quantity: order.quantity,
          sum: order.sum,
          consultantName: order.consultant.fullname,
          status: order.status || "unknown",
        }
      }))
    }
  }, [orders])

  const columns = [
    { id: 'productTitle', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'companyTitle', numeric: true, disablePadding: false, label: 'Company' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sum', numeric: true, disablePadding: false, label: 'Sum ($)' },
    { id: 'consultantName', numeric: true, disablePadding: false, label: 'Consultant' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  ]

  if (quotaLoading || loading) return <Loading />

  if (quotaError || error) return <Error error={quotaError || error} />

  return <ProfileComponent
    customer={customer}
    quota={quota}
    orders={flattenedOrders}
    columns={columns}
  />
}

export default React.memo(Profile)