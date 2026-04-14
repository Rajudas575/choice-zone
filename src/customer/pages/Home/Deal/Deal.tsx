import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import DealCard from "./DealCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../tempReduxToolkit/store";
import { useEffect } from "react";
import { getAllDeals } from "../../../../tempReduxToolkit/features/admin/dealSlice";

const Deal = () => {
  const dispatch = useAppDispatch();
  const deal = useAppSelector((store) => store.deal);
  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  return (
    <div className="py-5 lg:px-20">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}>
        {deal.deals.map((item, index) => (
          <SwiperSlide key={index}>
            <DealCard
              deal={{
                image: item?.category?.image,
                discount: item.discount,
                dealId: item._id,
                categoryId: item.category._id,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Deal;
