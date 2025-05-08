import VoteDetails from "@/components/modules/vote/VoteDetails";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getAVote } from "@/services/Vote";

const VoteDetailsPage = async ({
  params,
}: {
  params: Promise<{ voteId: string }>;
}) => {
  const { voteId } = await params;

  const { data: vote } = await getAVote(voteId);

  return (
    <CustomContainer>
      <Banner
        heading="Vote Details"
        description="See how users are voting on this review."
      />
      <VoteDetails vote={vote} />
    </CustomContainer>
  );
};

export default VoteDetailsPage;
