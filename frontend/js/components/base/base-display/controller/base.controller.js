import module from '../../../';

module.controller('baseController', function () {
    const _ctrlBase = this;

    _ctrlBase.show = false;

    _ctrlBase.openSideBar = function () {
        _ctrlBase.show = true;
    };
});