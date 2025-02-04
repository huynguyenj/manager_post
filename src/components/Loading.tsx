import loading from '../assets/Rolling@1x-1.0s-200px-200px.svg'
function Loading() {
  return (
      <div className='w-full h-screen fixed z-100 overflow-hidden items-center'>
           <div className='w-100 h-70 bg-white absolute top-[50%] left-[40%] transform-[translate(-50%,-50%)] flex items-center justify-center gap-2'>
           <img className='w-10 ' src={loading} alt="" />
           <p className='text-2xl'>Loading...</p>    
           </div>
      </div>
  )
}

export default Loading