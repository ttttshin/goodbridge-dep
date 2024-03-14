import React from "react";

export default function ModalButton(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="text-black font-bold uppercase text-sm px-6 py-3 
        rounded shadow hover:shadow-lg outline-none focus:outline-none 
        mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + {// eslint-disable-next-line
        props.title}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex h-screen overflow-hidden 
            fixed inset-0 z-50 outline-none focus:outline-none"
            aria-hidden="true"
          >
            <div className="relative w-auto ">
              <div
                className={`${// eslint-disable-next-line
                  props.bg} rounded-lg bg-GoodBridge_Cream shadow-xl w-[1500px] relative `}
              >
                <div className="flex items-start justify-between p-5 border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black ">
                    {// eslint-disable-next-line
                    props.title}
                  </h3>
                </div>
                {// eslint-disable-next-line
                props.children}
                <div className="flex items-center justify-end p-6 border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase 
                    px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear 
                    transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
