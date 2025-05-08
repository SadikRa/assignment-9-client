import AllVotes from "@/components/modules/vote";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getAllVotes } from "@/services/Vote";

const AllVotesPage = async () => {
  const { data: votes } = await getAllVotes();
  console.log(votes);

  return (
    <CustomContainer>
      <div>
        <Banner
          heading="User Votes"
          description="Discover user feedback and vote trends on reviews."
        />
        {votes && <AllVotes votes={votes} />}
      </div>
    </CustomContainer>
  );
};

export default AllVotesPage;
