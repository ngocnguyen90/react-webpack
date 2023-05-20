import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    if (open) this.setState({ showModal: true });
  }

  handleConfirm() {
    const { doConfirm } = this.props;
    doConfirm();
    this.setState({ showModal: false });
  }

  handleCancel() {
    const { cancelAction } = this.props;
    cancelAction();
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    const {
      message,
      title,
      cancelButton,
      saveButton,
    } = this.props;
    return (
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                      onClick={() => this.handleCancel()}
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                    >
                      <FontAwesomeIcon
                        className="w-5 h-5"
                        icon={faRemove}
                      />

                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-md leading-relaxed">
                      {message}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => this.handleCancel()}
                    >
                      {cancelButton?.label || 'No'}
                    </button>
                    <button
                      className={`${
                        saveButton.color || 'bg-gray-800'
                      } ${saveButton.hover || 'hover:bg-gray-700'} hover:text-white text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                      type="button"
                      onClick={() => this.handleConfirm()}
                    >
                      {saveButton?.label || 'Yes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }
}

export default Modal;
