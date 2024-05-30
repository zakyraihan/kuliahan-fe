// // useToast.js
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const useToast = () => {
//   const toastSuccess = (message: any) => {
//     toast.success(message, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };
//   const toastError = (message: any) => {
//     toast.error(message, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };
//   const toastWarning = (message: any) => {
//     toast.warning(message, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return { toastSuccess, toastError, toastWarning };
// };

// export default useToast;

import Swal from "sweetalert2";
const useToast = () => {
  const toastSuccess = (message: string) => {
    Swal.fire({
      position: "bottom-left",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 100000,
    });
  };

  const toastWarning = (message: string) => {
    Swal.fire({
      position: "bottom-left",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 10000,
    });
  };
  const toastError = () => {
    Swal.fire({
      position: "bottom-left",
      icon: "warning",
      title: "Ada Kesalahan",
      showConfirmButton: false,
      timer: 10000,
    });
  };

  return { toastError, toastWarning, toastSuccess };
};

export default useToast;
