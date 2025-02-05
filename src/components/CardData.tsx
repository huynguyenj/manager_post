import { SvgIconProps } from "@mui/material"

type StyleCard = {
  style:string,
  data: number | string,
  Icon?: React.ElementType<SvgIconProps>,
  content?:string
}
function CardData({style,data,Icon,content}:StyleCard) {
  return (
      <div className={style}>
              <div className="flex flex-col sm:flex-row  items-center justify-center gap-2">
                    {Icon &&
                  <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-amber-50 bg-white">
                      <Icon/>
                  </div>
                    }
                    {content&&
                  <p className="font-bold text-[0.55rem] sm: text-2xl md:text-[1rem] lg:text-2xl text-amber-50">
                    {content}
                    <span className="ml-2">{data}</span>
                  </p>
                    }
              </div>
            </div>

  )
}

export default CardData