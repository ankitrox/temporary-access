import name from "./name";
import reducer from "./Reducer";
import actions from "./Actions";
import selectors from "./Selectors";
import controls from "./Controls";

const { createReduxStore } = wp.data;

const Store = createReduxStore( name, {
    reducer,
    actions,
    selectors,
    controls,
});

export default Store;
