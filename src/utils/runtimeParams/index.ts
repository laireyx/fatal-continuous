import defaultParams from './defaults';
import { RuntimeParams } from './type';

const urlParams = new URL(location.href);
function getFpsParam(paramName: string) {
  const paramValue = urlParams.searchParams.get(paramName);

  if (!paramValue) return undefined;
  return Math.floor(1000 / parseInt(paramValue));
}

function applyDefaults(parsedParams: Partial<RuntimeParams>): RuntimeParams {
  const result = Object.fromEntries(
    Object.entries(defaultParams).map(([key, value]) => [
      key,
      parsedParams[key as keyof RuntimeParams] ?? value,
    ]),
  );

  return Object.freeze(result) as RuntimeParams;
}

const runtimeParams = applyDefaults({
  CAPTURE_FPS: getFpsParam('cap_fps'),
  VIEW_FPS: getFpsParam('fps'),
});

export default runtimeParams;
