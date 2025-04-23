import React, { useEffect } from 'react';
import PopupExitButton from '../partials/popupExit'
function ExitPopup(props: any) {
    const content = props?.content?.data;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">

                <PopupExitButton/>

                {/* Content */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {content?.leaving_message || 'Don’t leave yet!'}
                    </h2>
                    <p className="text-gray-600">
                        {content?.reason_to_stay || 'We have a special offer for you!'}
                    </p>
                    {content?.promo_code && (
                        <p className="my-2 font-bold text-base border-2 border-dotted py-2 px-4 rounded-lg">
                            {content.promo_code}
                        </p>
                    )}
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Claim Offer
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3">
                        We respect your privacy. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ExitPopup;
