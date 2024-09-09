import React from 'react'
import { useSelector } from "react-redux";
const Sidebar = () => {
     const { loginInfo } = useSelector((state) => state.auth);
  return (
    
        <div className="col-span-3 bg-white shadow-lg p-6 text-center">
          {loginInfo && (
            <img
              src={loginInfo.user.image}
              alt="User"
              className="rounded-full w-24 h-24 mb-4 mx-auto"
            />
          )}

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <h5 className="font-bold">Trades</h5>
              <p className="text-2xl">10</p>
            </div>
            <div>
              <h5 className="font-bold">Reviews</h5>
              <p className="text-2xl">25</p>
            </div>
            <div>
              <h5 className="font-bold">Comments</h5>
              <p className="text-2xl">50</p>
            </div>
          </div>
        </div>
  )
}

export default Sidebar