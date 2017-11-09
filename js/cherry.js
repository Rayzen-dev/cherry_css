    (function () {
        this.Modal = function () {
            this.closeButton = null;
            this.modal = null;
            this.overlay = null;

            this.transitionEnd = transitionSelect();

            var defaults = {
                autoOpen: false,
                className: 'modal-fade',
                closeButton: true,
                content: "",
                maxWidth: 500,
                minWidth: 280,
                overlay: true,
            };

            if (arguments[0] && typeof arguments[0] === "object") {
                this.options = extendDefaults(defaults, arguments[0]);
            }

            if(this.options.autoOpen) this.open();
        } // End Modal

        Modal.prototype.close = function () {
            var _ = this;
            this.modal.className = this.modal.className.replace(" modal-open", "");
            this.overlay.className = this.overlay.className.replace(" modal-open", "");
            this.modal.addEventListener(this.transitionEnd, function() {
                _.modal.parentNode.removeChild(_.modal);
            });
            this.overlay.addEventListener(this.transitionEnd, function() {
                if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
            });
        }

        Modal.prototype.open = function () {
            // Build the modal
            buildOut.call(this);

            // Init listeners
            initializeEvents.call(this);

            window.getComputedStyle(this.modal).height;
            this.modal.className = this.modal.className +
                (this.modal.offsetHeight > window.innerHeight ?
                    " modal-open modal-anchored" : " modal-open");
            this.overlay.className = this.overlay.className + " modal-open";
        }

        function buildOut() {
            var content, contentHolder, docFrag;

            if (typeof this.options.content === "string") {
                content = this.options.content;
            } else {
                content = this.options.content.innerHTML;
            }

            docFrag = document.createDocumentFragment();

            //Model element
            this.modal = document.createElement("div");
            this.modal.className = "modal " + this.options.className;
            this.modal.style.minWidth = this.options.minWidth + "px";
            this.modal.style.maxWidth = this.options.maxWidth + "px";

            if (this.options.closeButton) {
                this.closeButton = document.createElement("button");
                this.closeButton.className = "modal-close close-button";
                this.closeButton.innerHTML = "&times;";
                this.modal.appendChild(this.closeButton);
            }

            if (this.options.overlay) {
                this.overlay = document.createElement("div");
                this.overlay.className = "modal-overlay " + this.options.classname;
                docFrag.appendChild(this.overlay);
            }

            contentHolder = document.createElement("div");
            contentHolder.className = "modal-content";
            contentHolder.innerHTML = content;
            this.modal.appendChild(contentHolder);

            docFrag.appendChild(this.modal);

            console.log(docFrag);

            document.body.appendChild(docFrag);
        }

        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        function initializeEvents() {
            if (this.closeButton) {
                this.closeButton.addEventListener('click', this.close.bind(this));
            }

            if (this.overlay) {
                this.overlay.addEventListener('click', this.close.bind(this));
            }
        }

        function transitionSelect() {
            var el = document.createElement("div");
            if (el.style.WebkitTransition) return "webkitTransitionEnd";
            if (el.style.OTransition) return "oTransitionEnd";
            return 'transitionend';
        }


        // End function
    }(jQuery));

$(function() {
    $(".call-modal").on("click", function () {
        var modal = new  Modal({
           content:  document.getElementById(this.getAttribute('modal-target')).innerHTML,
        });
        modal.open();
    });
    
});