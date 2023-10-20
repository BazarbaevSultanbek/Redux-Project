import {useDispatch, useSelector} from "react-redux";
import "./Home.scss"
import {CountItemDec, CountItemInc, ResetItem, saveItems, ShowCodeItems} from "../store/reducers/useReducer.js";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";


function Home() {
    let items = useSelector(state => state?.items)
    const savedItems = useSelector(state => state?.items.savedItems);
    const dispatch = useDispatch()
    const [statusBtn, setStatus] = useState(false)
    const [random, setRandom] = useState("")
    const [code, setCode] = useState("")
    const saveBtn = useRef(null)
    const checkBtn = useRef(null)
    const load = useRef(null)
    const randomBlock = useRef(null)
    const check = useRef(null)
    const OrderInc = (id) => {
        dispatch(CountItemInc({id: id}))
    }
    const OrderDec = (id) => {
        dispatch(CountItemDec({id: id}))
    }
    const OrderReset = () => {
        dispatch(ResetItem())
    }
    const saveFunc = () => {
        if (items.total > 0) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = ""
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters[randomIndex];
            }
            setRandom(randomString)

            dispatch(saveItems({id: randomString, items: items}))
            dispatch(ResetItem())
            randomBlock.current.style.display = 'block'
            setTimeout(() => randomBlock.current.style.display = 'none', 5000)
        }
    }
    const submit = () => {
        const findItem = savedItems.filter((item) => item.id === code)
        console.log(findItem)
        dispatch(ShowCodeItems({items: findItem}))
        load.current.style.display = 'none'
    }
    const BlockBtn = (ref) => {
        if(ref === check){
            if(items.total>0){
                ref.current.style.display = 'block'
            }
        }else{
            ref.current.style.display = 'block'
        }

    }
    const CancelBtn = (ref) => {
        ref.current.style.display = 'none'
    }
    useEffect(() => {
        if (items.total > 0) {
            setStatus(true)
            saveBtn.current.style.background = '#1487e1'
            saveBtn.current.style.color = 'white'
            saveBtn.current.cursor = 'pointer'
            saveBtn.current.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'
            checkBtn.current.style.background = '#1487e1'
            checkBtn.current.style.color = 'white'
            checkBtn.current.cursor = 'pointer'
            checkBtn.current.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'

        } else {
            setStatus(false)
            saveBtn.current.style.background = 'rgba(0, 0, 0, 0.12)'
            saveBtn.current.style.color = 'rgba(0, 0, 0, 0.26)'
            saveBtn.current.cursor = 'none'
            saveBtn.current.style.boxShadow = 'none'
            checkBtn.current.style.background = 'rgba(0, 0, 0, 0.12)'
            checkBtn.current.style.color = 'rgba(0, 0, 0, 0.26)'
            checkBtn.current.cursor = 'none'
            checkBtn.current.style.boxShadow = 'none'

        }
    }, [items, statusBtn])
    return (
        <div className="Home">
            <div className="modul-load" ref={load} style={{display: "none"}}>
                <div className="modul-load-in">
                    <div className="modul-load-in-nav">
                        <button className="load-cancel" onClick={() => CancelBtn(load)}>x</button>
                        <p>Load pizza using a configuration number:</p>
                        <div>
                            <input type="text" onChange={(e) => setCode(e.target.value)} value={code}/>
                            <button className="load-Submit" onClick={submit}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modul-checkout" ref={check} style={{display: "none"}}>
                <div className="modul-checkout-in">
                    <div className="modul-checkout-in-navi">
                        <h2>Your Order</h2>
                        <p>The pizza has the following ingredients:</p>
                        <ul>
                            {items.ingredients.map((item)=>{
                              if(item.number>0){
                                  // eslint-disable-next-line react/jsx-key
                                  return <li key={item.id}>{item.name}:{ item.number}</li>
                              }
                            })}
                        </ul>
                        <h3>Total price:{items.total} $</h3>
                        <div>
                            <button onClick={() => CancelBtn(check)}>Cancel</button>
                            <Link to={"/order"}><button>Continue</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Home-header">
                <span>Pizza builder</span>
                <span>Ingredients</span>
            </div>
            <div className="Home-block">
                <div className="Home-block-items">
                    <h3>Your Pizza</h3>
                    <div className="Home-block-items-images">
                        <div className="img-block"><img src={items.pizza} alt="img"/></div>
                        {
                            items.ingredients.map((item) => {
                                if (item.status) {
                                    // eslint-disable-next-line react/jsx-key
                                    return <div className="img-block" key={item.id}><img src={item.img} alt="img"/>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="Home-block-navi">
                    <div className="Home-block-navi-head">
                        <h3>Your pizza</h3>
                        <span>{items.total} $</span>
                        <button onClick={OrderReset}>Reset pizza</button>
                    </div>
                    <div className="Home-block-navi-menu">
                        <ul>
                            {
                                items.ingredients.map((item) => (
                                    <li key={item.id}>
                                        <div>
                                            <p>{item.name}</p>
                                            <p>{item.price} $</p>
                                        </div>
                                        <div>
                                            <button onClick={() => OrderDec(item.id)}>-</button>
                                            <input type="number" max="10" min="0" step="1" readOnly
                                                   value={item.number}/>
                                            <button onClick={() => OrderInc(item.id)}>+</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <p className="Home-total">
                            <span>Total:</span>
                            <span>{items.total} $</span>
                        </p>
                        <div className="Home-navi-menu-btn">
                            <button ref={saveBtn} onClick={saveFunc}>save pizza</button>
                            <button ref={checkBtn} onClick={() => BlockBtn(check)}>checkout</button>
                        </div>
                        <div className="Load">
                            <button onClick={() => BlockBtn(load)}>load pizza</button>
                        </div>
                        <div className="Random" style={{display: "none"}} ref={randomBlock}>
                            <p>Your pizza configuration has been saved.</p>
                            <p>Your pizza number is :{random}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;