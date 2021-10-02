import { UpdateMovieGroupBody } from "@app/pages/api/groups/movies/[id]";
import { TransformedMovieGroup } from "@app/services/groups";
import { Button, MenuItem } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

interface MovieGroupItemProps {
  movieId: string;
  movieGroup: TransformedMovieGroup;
  onAdd: () => void;
}

export const MovieGroupMenuItem: React.FC<MovieGroupItemProps> = ({ movieId, movieGroup }) => {
  return <></>;
};
