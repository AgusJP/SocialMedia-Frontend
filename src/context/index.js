import React from "react";
import { AuthProvider } from "./authContext.js";
import { UploadProvider } from "./uploadContext.js";
import { SearchProvider } from "./searchContext.js";
import { FollowProvider } from "./followContex.js";
import { FeedProvider } from './feedContext.js';

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <UploadProvider>
        <SearchProvider>
          <FollowProvider>
            <FeedProvider>
              {children}
            </FeedProvider>           
          </FollowProvider>
        </SearchProvider>
      </UploadProvider>
    </AuthProvider>
  );
};

export default Providers;
