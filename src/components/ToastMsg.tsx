const ToastMsg = ({ errorMessage, type }: { errorMessage: string, type: 'error' | 'success' }) => {
  return (
    <div className={`${type === 'error' ? 'bg-red-500' : 'bg-blue-500'} z-50 fixed w-72 h-10 top-12 left-1/2 -translate-x-1/2 flex text-white text-center items-center justify-center px-4 py-2 rounded-lg text-sm animate-fade-in-up`}>
      {errorMessage}
    </div>
  );
};

export default ToastMsg;