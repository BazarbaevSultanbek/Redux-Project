import './order.scss'
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";
function Order() {
    const items = useSelector(state=>state?.items)
    const form = useForm();
    const { register,handleSubmit,formState,reset } = form;
    const { errors } = formState;
    const [coupon,setCoupon] = useState(false)

    const submitForm = ()=>{
        alert('Submitted')
        reset()
    }
    return (
        <div className="Order">
            <div className="Order-header">
                <span>Pizza builder</span>
                <span>Ingredients</span>
            </div>
            <div className="Order-block">
                <div className="Order-block-info">
                    <h3>Ingredient info:</h3>
                    <div className="Order-block-info-images">
                        {    items.ingredients.map((item) => {
                            if (item.status) {
                                // eslint-disable-next-line react/jsx-key
                                return <div className="img-block" key={item.id}>
                                    <h3>{item.name}</h3>
                                    <img src={item.img} alt="img"/>
                                    <p>{item.number}</p>
                                </div>
                            }
                        })

                        }
                    </div>
                </div>
                <form className="Order-block-check" onSubmit={handleSubmit(submitForm)} noValidate>
                    <h3>Checkout info:</h3>
                    <div className="Order-block-check-name">
                        <span>Name:</span>
                        <input type="text" name="name" placeholder="Name" {...register("name",{
                            required: {
                                value:true,
                                message:'Name is required field'
                            }
                        })} className={errors.name ? "error-input" : ""}/>
                    </div>
                    <p className="error">{errors.name?.message}</p>
                    <div className="Order-block-check-email">
                        <span>Email:</span>
                        <input type="text" name="email" placeholder="Email" {...register("email",
                            {
                                required: {value:true,message:'Email is required field'},
                                pattern:{
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message:'Invalid email format'
                                }
                            }
                        )} className={errors.email ? "error-input" : ""}/>
                    </div>
                    <p className="error">{errors.email?.message}</p>
                    <div className="Order-block-check-method">
                        <span>Choose delivery method:</span>
                        <select placeholder="Method" {...register("select",{
                            required: {
                                value:true,
                                message:'Please select an option'
                            }
                        })
                        }>
                            <option disabled selected value="">Method</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Local pickup">Local pickup</option>
                        </select>
                        <p className="error-select">{errors.select?.message}</p>
                    </div>
                    <div className="Order-block-check-more">
                        <span>Additional notes:</span>
                        <textarea placeholder="Message"></textarea>
                    </div>
                    <div className="Order-block-check-client">
                        <span>Are you a regular client:</span>
                        <div>
                            <input type="radio" name="client" id="1" />
                            <span>Yes</span>
                        </div>
                        <div>
                            <input type="radio" name="client" id="2"/>
                            <span>No</span>
                        </div>
                    </div>
                    <div className="Order-block-check-code">
                        <span>Do you have a coupon code:</span>
                        <input type="checkbox" onClick={() => setCoupon(!coupon)}/>
                    </div>
                    <div className="Order-block-check-cupon">
                        <span>Coupon:</span>
                        <input type="text" placeholder="Coupon" {...register('coupon',{
                            required: {value:coupon,message:'Coupon is required field'}
                        })} className={errors.coupon ? "error-input" : ""}/>
                    </div>
                    <p className="error-coupon">{errors.coupon?.message}</p>
                    <div className="Order-block-check-btn">
                        <button onClick={()=>reset()}>reset</button>
                        <button>submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Order;