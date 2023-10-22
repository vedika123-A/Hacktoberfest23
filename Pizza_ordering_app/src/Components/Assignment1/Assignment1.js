import React from "react";
import "./style.scss";
import Img1 from "../Assests/pizza2.png";
import Img2 from "../Assests/pizza1.jpg";
import Img3 from "../Assests/Peppy_Paneer.jpg";

const Header = () => {
  return (
    <div className="header">
      <p>Pizza Order Form</p>
    </div>
  );
};

class Assignmentone extends React.Component {
  constructor() {
    super();
    this.state = {
      custName: "",
      phone: "",
      data: [
        {
          id: 1,
          src: Img1,
          selected: false,
          name: "Chicken Dominator",
          unitPrice: 180,
          quantity: 0
        },
        {
          id: 2,
          src: Img2,
          selected: false,
          name: "Farm Pizza",
          unitPrice: 120,
          quantity: 0
        },
        {
          id: 3,
          src: Img3,
          selected: false,
          name: "Peppy Paneer",
          unitPrice: 150,
          quantity: 0
        }
      ],
      grandTotal: 0
    };
  }

  setInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  setCheck = (id) => {
    let temp = this.state.data;
    temp[id] = {
      ...this.state.data[id],
      quantity: this.state.data[id].selected ? this.state.data[id].quantity : 0,
      selected: !this.state.data[id].selected
    };
    this.setState({ ...this.state, data: temp });
  };

  setQuantity = (id, event) => {
    let temp = this.state.data;
    temp[id] = {
      ...this.state.data[id],
      quantity: event.target.value ? event.target.value : 0
    };
    this.setState({ ...this.state, data: temp });
  };

  calGrandTotal = (e) => {
    e.preventDefault();
    let temp = this.state.data;
    let total = 0;
    for (let i in temp) {
      total += temp[i].unitPrice * parseInt(temp[i].quantity);
    }
    this.setState({ ...this.state, grandTotal: total });
  };

  onClearOrder = (e) => {
    e.preventDefault();
    this.setState({
      custName: "",
      phone: "",
      data: [
        {
          id: 1,
          src: Img1,
          selected: false,
          name: "Chicken Dominator",
          unitPrice: 180,
          quantity: 0
        },
        {
          id: 2,
          src: Img2,
          selected: false,
          name: "Farm Pizza",
          unitPrice: 120,
          quantity: 0
        },
        {
          id: 3,
          src: Img3,
          selected: false,
          name: "Peppy Paneer",
          unitPrice: 150,
          quantity: 0
        }
      ],
      grandTotal: 0
    });
  };

  render() {
    return (
      <div className="page">
        <Header />
        <form className="body">
          <div className="customer">
            <div>
              <label htmlFor="name">Customer Name</label>
              <input
                type="text"
                name="custName"
                id="name"
                onInput={this.setInput}
                placeholder="Your name..."
              />
            </div>
            <div>
              <label htmlFor="tel">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="tel"
                maxLength="12"
                placeholder="Mobile Number.."
                onInput={this.setInput}
              />
            </div>
          </div>

          <div className="menu">
            <h2 className="pizzaList">Pizza Choice</h2>
            <h2>Quantity</h2>
            <h2>Unit Price</h2>
            <h2>Total Price</h2>

            {this.state.data.map((item) => {
              return (
                <>
                  <img src={item.src} alt="img" />
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      name={item.name}
                      id={item.name}
                      onChange={() => {
                        this.setCheck(item.id - 1);
                      }}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                  <input
                    type="number"
                    name="quantity"
                    onInput={(e) => {
                      this.setQuantity(item.id - 1, e);
                    }}
                    readOnly={!item.selected}
                  />
                  <input
                    type="text"
                    name="price"
                    value={`₹${item.unitPrice}`}
                    readOnly
                  />

                  <input
                    type="text"
                    readOnly
                    value={`₹${item.unitPrice * parseInt(item.quantity)}`}
                  />
                </>
              );
            })}
          </div>
          <div className="total">
            <div className="totalPrice">
              <p>Grand Total</p>
              <input
                type="text"
                className="total"
                value={`₹${this.state.grandTotal}`}
                readOnly
              />
            </div>
            <div className="btnGroup">
              <button onClick={this.calGrandTotal}>
                Calculate Order Total
              </button>
              <button onClick={this.onClearOrder}>Clear Order</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Assignmentone;
