import {
  faCircleInfo,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AlertCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { title, errors, color, textColor, open } = this.props;
    return (
      <>
        {open && (
          <div className="flex w-full flex-col gap-2">
            <div
              className={`flex p-4 mb-4 text-sm ${
                textColor || 'text-red-800'
              } rounded-lg ${color || 'bg-red-50'}`}
              role="alert"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                icon={faCircleInfo}
              />
              <span className="sr-only">Danger</span>
              <div>
                <span className="font-medium">
                  {title || 'Ensure that these requirements are met'}:
                </span>
                <ul className="mt-1.5 ml-4 list-disc list-inside">
                  {errors.map((error, i) => (
                    <li key={i}>
                      {error.key
                        ? `${error.key}: ${error.message}`
                        : error.message}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => this.handleClose()}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
                data-dismiss-target="#alert-2"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon className="w-5 h-5" icon={faClose} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AlertCustom;
