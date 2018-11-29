let path = 'D:/NRG Stream/OBS/NRG Streaming Dashboard';

if (path.trim().substr(-1) !== '/') {
    path += '/';
}

var config = {
    OBSDirectory: path + 'DataFiles/',
    ImagesDirectory: path + 'Images/',
    JSONDirectory: path + 'JSON/'
};

module.exports = {
    OBSDirectory: config.OBSDirectory,
    ImagesDirectory: config.ImagesDirectory,
    JSONDirectory: config.JSONDirectory
};
