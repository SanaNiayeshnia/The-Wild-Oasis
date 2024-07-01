import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

function useGuests() {
  const { data: guests, isLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });
  return { guests, isLoading };
}

export default useGuests;
