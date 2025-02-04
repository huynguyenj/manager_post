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
              <div className="flex items-center justify-center gap-2">
                    {Icon &&
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border-amber-50 bg-white">
                      <Icon/>
                  </div>
                    }
                    {content&&
                  <p className="font-bold sm: text-1xl md:text-2xl lg:text-2xl text-amber-50">
                    {content}
                    <span className="ml-2">{data}</span>
                  </p>
                    }
              </div>
            </div>

  )
}

export default CardData