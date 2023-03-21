import React, { ReactNode, useEffect, useState } from 'react';
import ViewModel from '../Model/ViewModel';

interface PaymentViewModelProps {
	show: boolean;

	handleClose: () => void
}

const PaymentViewModel: React.FC<PaymentViewModelProps> = ({show, handleClose}) => {
	const [showModel, setShowModel] = useState(false)

	useEffect(() => {
		setShowModel(show)
	}, [show])

	return (
		<ViewModel show={showModel}>
		<div className="mid-content paypop">
			<h4>Order Details</h4>
			<h5>Idol {`>`}  Ganeshji</h5>
			<table className="table table-responsive table-bordered paymntable">
				<tr>
					<th>Order ID</th>
					<th>Product Title</th>
					<th>Order Quantity</th>
					<th>Per Unit price</th>
					<th>Order Date</th>
				</tr>
				<tr>
					<td>0001</td>
					<td>8 inch GaneshjiIdol</td>
					<td>1</td>
					<td>1200</td>
					<td>28-08-2022 17:04 PM</td>
				</tr>
			</table>

			<h4 className="pt-3">Invoice Details</h4>
			<table className="table table-responsive table-bordered paymntable">
				<tr>
					<th>Invoice #</th>
					<th>Invoiced On</th>
					<th>Bill to Name</th>
					<th>Bill to Location</th>
					<th>Grand Total</th>
				</tr>
				<tr>
					<td>CG/08/22/00001</td>
					<td>28-08-2022 |17.04 PM</td>
					<td>Aditya Singh</td>
					<td>Banglore</td>
					<td>1260</td>
				</tr>
			</table>
			<div className="transcation_detail">
				<h4>Transaction Details</h4>
				<div className="transcation_detail_cont">
					<p>Transaction ID</p>
					<p>PP27901001</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Transaction Date</p>
					<p>05-09-2022 | 17.00 PM</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Order Amount</p>
					<p>Rs. 1200</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Commission Fees</p>
					<p>Rs. 50</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Convenience Fees</p>
					<p>Rs. 10</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Shipping Fees</p>
					<p>Rs. 15</p>
				</div>
				<div className="transcation_detail_cont">
					<p>Total GST</p>
					<p>Rs. 100</p>
				</div>
				<div className="transcation_detail_cont">
					<p>TDS</p>
					<p>Rs. 10</p>
				</div>
				<div className="transcation_detail_cont">
					<p>TCS</p>
					<p>Rs. 10</p>
				</div>
				<div className="transcation_detail_cont">
					<p>My Earnings</p>
					<p>Rs. 1005</p>
				</div>
				<div className="transcation_detail_close">
					<button type="button" className="close pointer" onClick={handleClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	</ViewModel>
	)
}

export default PaymentViewModel;