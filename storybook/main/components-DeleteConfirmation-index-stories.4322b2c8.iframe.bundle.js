"use strict";(self.webpackChunktemporary_access=self.webpackChunktemporary_access||[]).push([[589],{"./assets/js/components/DeleteConfirmation/index.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),WithRegistrySetup=__webpack_require__("./tests/js/WithRegistrySetup.js"),test_utils=__webpack_require__("./tests/js/utils/test-utils.js"),Button=__webpack_require__("./node_modules/@mui/material/Button/Button.js"),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),modal=__webpack_require__("./node_modules/@wordpress/components/build-module/modal/index.js"),component=__webpack_require__("./node_modules/@wordpress/components/build-module/flex/flex/component.js"),use_dispatch=__webpack_require__("./node_modules/@wordpress/data/build-module/components/use-dispatch/use-dispatch.js"),use_select=__webpack_require__("./node_modules/@wordpress/data/build-module/components/use-select/index.js"),constants=__webpack_require__("./assets/js/datastores/constants.js"),react=__webpack_require__("./node_modules/react/index.js");function DeleteConfirmation(){const dispatch=(0,use_dispatch.A)(),{resetDeleteConfirmation,setContext}=(0,use_dispatch.A)(constants.r),{getUsers,deleteUser,setNotice}=(0,use_dispatch.A)(constants.E),user=(0,use_select.A)((select=>select(constants.r).getUserToDelete())),isOpen="delete"===(0,use_select.A)((select=>select(constants.r).getContext())),getPageModal=(0,use_select.A)((select=>select(constants.r).getPageModal())),onCloseModal=()=>{resetDeleteConfirmation(),setContext("default")};return(0,react.useEffect)((()=>{if(isOpen){const deleteCancel=document.getElementById("tempaccess-delete-cancel");deleteCancel?.focus()}}),[isOpen]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isOpen&&(0,jsx_runtime.jsxs)(modal.A,{__experimentalHideHeader:!0,className:"tempaccess-modal-delete-form",onRequestClose:onCloseModal,shouldCloseOnClickOutside:!1,children:[(0,jsx_runtime.jsx)("p",{children:(0,build_module.__)("Are you sure you want to delete the user?","passwordless-temporary-login")}),(0,jsx_runtime.jsxs)(component.A,{children:[(0,jsx_runtime.jsx)(Button.A,{id:"tempaccess-delete-cancel",onClick:onCloseModal,variant:"outlined",children:(0,build_module.__)("Cancel","passwordless-temporary-login")}),(0,jsx_runtime.jsx)(Button.A,{id:"tempaccess-delete-confirm",variant:"outlined",color:"error",onClick:async()=>{const{error}=await deleteUser(user?.ID);error||(dispatch(constants.E).invalidateResolutionForStoreSelector("getUsers"),setNotice({code:"user_deleted",message:(0,build_module.__)("User deleted successfully","passwordless-temporary-login"),noticeType:"success"}),onCloseModal(),getUsers(getPageModal))},children:(0,build_module.__)("Delete","passwordless-temporary-login")})]})]})})}const Default=function Template({setupRegistry=()=>{}}){return(0,jsx_runtime.jsx)(WithRegistrySetup.A,{func:setupRegistry,children:(0,jsx_runtime.jsx)(DeleteConfirmation,{})})}.bind({});Default.storyName="Delete confirmation",Default.args={setupRegistry:registry=>{registry.dispatch(constants.r).setContext("delete")}};const index_stories={title:"Components/DeleteConfirmation",decorators:[Story=>{const registry=(0,test_utils.Cj)();return(0,jsx_runtime.jsx)(test_utils.MG,{registry,children:(0,jsx_runtime.jsx)(Story,{})})}]},__namedExportsOrder=["Default"]}}]);