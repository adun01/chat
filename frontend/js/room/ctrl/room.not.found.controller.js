import module from '../';

module.controller('roomNotFoundController', function ($mdDialog, $timeout, $state) {
    $timeout(function () {
        $state.go('resolve.main.room', {
            id: 0
        });
        $mdDialog.cancel();
    }, 5000);
});