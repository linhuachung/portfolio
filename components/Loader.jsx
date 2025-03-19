import React from "react";
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  PuffLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader
} from "react-spinners";

const Loader = ( { type = "ClipLoader", color = "#00ff99", size = 50, speedMultiplier = 1 } ) => {
  const loaderProps = { color, size, speedMultiplier };

  const getLoader = () => {
    switch ( type ) {
    case "BarLoader":
      return <BarLoader { ...loaderProps } />;
    case "BeatLoader":
      return <BeatLoader { ...loaderProps } />;
    case "BounceLoader":
      return <BounceLoader { ...loaderProps } />;
    case "CircleLoader":
      return <CircleLoader { ...loaderProps } />;
    case "ClimbingBoxLoader":
      return <ClimbingBoxLoader { ...loaderProps } />;
    case "ClipLoader":
      return <ClipLoader { ...loaderProps } />;
    case "ClockLoader":
      return <ClockLoader { ...loaderProps } />;
    case "DotLoader":
      return <DotLoader { ...loaderProps } />;
    case "FadeLoader":
      return <FadeLoader { ...loaderProps } />;
    case "GridLoader":
      return <GridLoader { ...loaderProps } />;
    case "HashLoader":
      return <HashLoader { ...loaderProps } />;
    case "MoonLoader":
      return <MoonLoader { ...loaderProps } />;
    case "PacmanLoader":
      return <PacmanLoader { ...loaderProps } />;
    case "PulseLoader":
      return <PulseLoader { ...loaderProps } />;
    case "PuffLoader":
      return <PuffLoader { ...loaderProps } />;
    case "RingLoader":
      return <RingLoader { ...loaderProps } />;
    case "RiseLoader":
      return <RiseLoader { ...loaderProps } />;
    case "RotateLoader":
      return <RotateLoader { ...loaderProps } />;
    case "ScaleLoader":
      return <ScaleLoader { ...loaderProps } />;
    case "SkewLoader":
      return <SkewLoader { ...loaderProps } />;
    case "SquareLoader":
      return <SquareLoader { ...loaderProps } />;
    case "SyncLoader":
      return <SyncLoader { ...loaderProps } />;
    default:
      return <PropagateLoader { ...loaderProps } />;
    }
  };

  return <div className="flex justify-center items-center">{ getLoader() }</div>;
};

export default Loader;