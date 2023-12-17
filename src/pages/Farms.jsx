import { Fragment, useEffect, useState } from "react";

import Farm from "./Farm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { UserState } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Example() {
  const [farms, Setfarms] = useState([]);
  const [QueryFarm, SetQueryFarm] = useState([]);
  const [query, Setquery] = useState("");
  const [no, Setno] = useState(false);
  const { SetWhichF, whichF } = UserState();

  const navigate=useNavigate();

  const getALlFarms = async () => {
    const querySnapshot = await getDocs(collection(db, "farm"));
    const data = querySnapshot.docs;
    Setfarms(
      data.map((el) => {
        if (!el.data().userId) {
          return el;
        }
      })
    );
    SetQueryFarm(
      data.map((el) => {
        if (!el.data().userId) {
          return el;
        }
      })
    );
  };
  useEffect(() => {
    getALlFarms();
  }, []);
 
  const addQuery = () => {
    if (query !== "") {
      SetQueryFarm(
        farms.map((el) => {
          if (el&&el.data().addres.toLowerCase().includes(query.toLowerCase())) {
            return el;
          }
        })
      );
    } else {
      SetQueryFarm(farms);
    }
  };
  console.log(QueryFarm)
  console.log(farms,"farms")

   const whichFarm=async(f)=>{
       SetWhichF(f);
   }


  return (
    <>
      <Header />
      <div style={{ margin: "150px auto" }} className="mt-32">
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontFamily: "cursive",
            fontWeight: "bold",
          }}
        >
          You can explore different farms from here
        </h1>
        <input
          text="text"
          value={query}
          onChange={(e) => {
            Setquery(e.target.value);
            addQuery();
          }}
          placeholder="search your query"
          style={{
            border: "1px solid ",
            borderRadius: "5px",
            margin: "15px 150px 0px",
          }}
        />
        {/* model regarding term and conditions */}

        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Term and conditions
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ color: "red" }}
                ></button>
              </div>
              <div class="modal-body">
                The terms and conditions for buying a farm can vary greatly
                depending on several factors, including the location, type of
                farm, and financing involved. However, here are some general
                terms and conditions to consider before taking the plunge:
                Property and Land: Land ownership: Ensure you understand the
                property boundaries, any existing easements or access rights,
                and potential land use restrictions. Condition of land: Be aware
                of any environmental concerns like soil contamination, water
                rights, or existing infrastructure limitations. Farm buildings
                and structures: Understand the condition of existing buildings,
                their intended use, and any potential renovations or repairs
                needed. Inspections: Stipulate the right to conduct thorough
                inspections of the property, buildings, and infrastructure by
                qualified professionals. Financial terms: Purchase price:
                Clearly define the total purchase price, any down payment
                requirements, and closing costs. Financing: If using a loan,
                ensure you understand the loan terms, interest rates, repayment
                schedule, and any potential prepayment penalties. Escrow:
                Consider using an escrow account to hold funds until the sale is
                finalized, protecting both parties. Taxes: Determine who will be
                responsible for property taxes and other fees and assessments
                before and after closing.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ color: "black" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ color: "black" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/payment");
                  }}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "30px",
            margin: "auto",
          }}
        >
          {QueryFarm.map((el) => {
            if (el) {
              return <Farm key={el.id} value={{ el, whichFarm }} />;
            }
          })}
          {!no && <h2>no more</h2>}
        </div>
      </div>
      <div className="bg-gray-500 p-6">
        <Footer />
      </div>
    </>
  );
}
