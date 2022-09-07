/**
 * Extrude submodule structure to plain store's state object
 *
 * @param module
 * @return {{}}
 */
const extrudeSubmodule = (module) => {
  const state = module.state || {};
  const submodules = module.modules || {};

  const submodulesState = Object
    .keys(submodules)
    .reduce((storage, module) => ({
      ...storage,
      [module]: extrudeSubmodule(submodules[module])
    }), {});

  return { ...state, ...submodulesState }
};

/**
 * Get initial state -> collect from modules
 *
 * @param modules
 */
const initialState = modules =>
  Object
    .keys(modules)
    .reduce((storage, module) => ({ ...storage, [module]: extrudeSubmodule(modules[module]) }), {});

export default initialState
