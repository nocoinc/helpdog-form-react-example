import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Helpdog?: {
      site?: {
        instantSearch: (config: any) => any;
      };
    };
  }
}

const HelpdogSearch: React.FC = () => {
  const siteId = "01JPVM5ZPX7E96GTDF9S3W1MS9";
  const queryFields =
    "#subject,#message,input[name='inquiryType'],input[name='services'],#implementationMethod";
  const targetId = `helpdog-search-${Math.random()
    .toString(36)
    .substring(2, 11)}`;

  const searchBoxRef = useRef<any>(null);

  // Helpdog検索の初期化
  useEffect(() => {
    if (!window?.Helpdog?.site?.instantSearch) {
      return;
    }

    try {
      searchBoxRef.current = window.Helpdog.site.instantSearch({
        siteId,
        target: `#${targetId}`,
        queryFields,
      });

      // ResizeObserverでiframeの高さ変化を監視（Helpdog公式と同じ方式）
      let resizeObserver: ResizeObserver | null = null;
      const parentDiv = document.getElementById(targetId);

      if (parentDiv) {
        // iframe要素を探す（少し待つ必要がある）
        const checkForIframe = () => {
          const iframe = parentDiv.querySelector("iframe");
          if (iframe) {
            resizeObserver = new ResizeObserver(() => {
              const height = iframe.clientHeight;
              if (height > 0) {
                parentDiv.style.height = "auto";
                parentDiv.style.overflow = "visible";
              } else {
                parentDiv.style.height = "0px";
                parentDiv.style.overflow = "hidden";
              }
            });
            resizeObserver.observe(iframe);
          } else {
            // iframeがまだない場合は少し待って再試行
            setTimeout(checkForIframe, 100);
          }
        };

        // 初期状態は高さ0
        parentDiv.style.height = "0px";
        parentDiv.style.overflow = "hidden";

        checkForIframe();

        // クリーンアップ時にResizeObserverを停止
        return () => {
          resizeObserver?.disconnect();
        };
      }
    } catch (error) {
      console.error("Failed to initialize Helpdog search:", error);
    }

    return () => {
      searchBoxRef.current?.destroy();
    };
  }, [siteId, targetId, queryFields]);

  return <div id={targetId} />;
};

export default HelpdogSearch;
