export default function useEditMovieGroupMutation() {
  return useMutation(async (updatedMovieGroup: UpdateMovieGroupBody) => {
    const response = await fetch(`/api/groups/movies/${currentGroupData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovieGroup),
    });
    queryClient.invalidateQueries(["movieGroup", currentGroupData.id]);
    return response;
  });
}
