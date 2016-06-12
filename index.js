const myEvents = require('./libs/events');
const myValidator = require('./libs/validator');

function pmEvents(options) {
    this.sockPath = null;
    this.eventHandler = null;
    this.errorHandler = null;

    myValidator.init();
    this.init(options);
}

/**
 * Pre init: get sock path
 *
 * @param {Function} callback
 * @return {Context} this
 * @api private
 */

pmEvents.prototype.preInit = function (callback) {
    if (this.sockPath) {
        return callback();
    }

    myEvents.getSockPath((err, sockPath) => {
        if (err) {
            this.error(err);          
        } else {
            this.sockPath = sockPath;
        }

        return callback();
    });
};

/**
 * Init connect and events listener
 *
 * @return {Context} this
 * @api private
 */

pmEvents.prototype.listen = function () {
    myEvents.main(this.sockPath, this.eventHandler, this.errorHandler);
};

/**
 * Init and parse options
 *
 * @param {Object} options
 * @return {Context} this
 * @api private
 */

pmEvents.prototype.init = function (options) {
    options = options || {};
    options.sockPath = options.sockPath || null;
    options.sockPath && myValidator.isSocketFile(options.sockPath);
    this.sockPath = options.sockPath;

    this
    .preInit(() => {
        this.listen();
    });
};

/**
 * Handle events 
 *
 * @param {Function} callback
 * @return {Context} this
 * @api public
 */

pmEvents.prototype.on = function (callback) {
    myValidator.isFunction(callback);
    this.eventHandler = callback;
    return this;
};

/**
 * Handle errors
 *
 * @param {Function} callback
 * @return {Context} this
 * @api public
 */

pmEvents.prototype.error = function (callback) {
    myValidator.isFunction(callback);
    this.errorHandler = callback;
    return this;
};

/**
 * Expose pmEvents
 */

module.exports = pmEvents;
