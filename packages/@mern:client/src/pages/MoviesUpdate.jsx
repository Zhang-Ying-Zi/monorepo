import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

export default function MoviesUpdate() {
  let params = useParams();
  let [state, setState] = useState({
    id: params.id,
    name: "",
    rating: "",
    time: "",
  });

  useEffect(() => {
    async function getData() {
      const movie = await api.getMovieById(state.id);

      setState((prevState) => {
        return {
          ...prevState,
          name: movie.data.data.name,
          rating: movie.data.data.rating,
          time: movie.data.data.time.join("/"),
        };
      });
    }
    if (state.id) getData();
    return () => {};
  }, [state.id]);

  let handleChangeInputName = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };

  let handleChangeInputRating = async (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        rating: event.target.validity.valid ? event.target.value : state.rating,
      };
    });
  };

  let handleChangeInputTime = async (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        time: event.target.value,
      };
    });
  };

  let handleUpdateMovie = async () => {
    const { id, name, rating, time } = state;
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };

    await api.updateMovieById(id, payload).then((res) => {
      window.alert(`Movie updated successfully`);
      setState((prevState) => {
        return {
          ...prevState,
          name: "",
          rating: "",
          time: "",
        };
      });
    });
  };

  return (
    <Wrapper>
      <Title>Create Movie</Title>

      <Label>Name: </Label>
      <InputText
        type="text"
        value={state.name}
        onChange={handleChangeInputName}
      />

      <Label>Rating: </Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={state.rating}
        onChange={handleChangeInputRating}
      />

      <Label>Time: </Label>
      <InputText
        type="text"
        value={state.time}
        onChange={handleChangeInputTime}
      />

      <Button onClick={handleUpdateMovie}>Update Movie</Button>
      <CancelButton href={"/movies/list"}>Cancel</CancelButton>
    </Wrapper>
  );
}
