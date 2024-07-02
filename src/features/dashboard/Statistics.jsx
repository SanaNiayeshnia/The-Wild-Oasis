import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Statistic from "./Statistic";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatPrice } from "../../utilities/helper";

function Statistics({ bookings, confirmedStays, numDays, cabinsCount }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce(
    (total, currBooking) => currBooking.totalPrice + total,
    0
  );
  const checkIns = confirmedStays?.length;

  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Statistic
        title="BOOKINGS"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Statistic
        title="SALES"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatPrice(sales)}
      />
      <Statistic
        title="CHECK INS"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Statistic
        title="OCCUPANCY RATE"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Statistics;
