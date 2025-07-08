import React, { useEffect, useRef, useState } from "react";

interface HelpdogSearchProps {
  siteId: string;
  queryFields: string; // CSS セレクター（HTMLと同じ形式）
  target?: string; // ターゲットID（省略時は自動生成）
  className?: string;
  tracking?: {
    form_id?: string;
    form_name?: string;
    hosting_type?: string;
  };
}

declare global {
  interface Window {
    Helpdog?: {
      site?: {
        instantSearch: (config: any) => any;
      };
    };
  }
}

const HelpdogSearch: React.FC<HelpdogSearchProps> = ({
  siteId,
  queryFields,
  target,
  className = "",
  tracking,
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [targetId] = useState(
    target || `helpdog-search-${Math.random().toString(36).substring(2, 11)}`
  );
  const searchBoxRef = useRef<any>(null);

  // スクリプトの動的読み込み
  useEffect(() => {
    if (window?.Helpdog?.site?.instantSearch) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.helpdog.ai/v1/script.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Helpdog script failed to load");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Helpdog検索の初期化
  useEffect(() => {
    if (!isScriptLoaded || !window?.Helpdog?.site?.instantSearch) {
      return;
    }

    try {
      searchBoxRef.current = window.Helpdog.site.instantSearch({
        siteId,
        target: `#${targetId}`,
        queryFields,
        tracking: tracking || {},
      });

      // ResizeObserverでiframeの高さ変化を監視（Helpdog公式と同じ方式）
      let resizeObserver: ResizeObserver | null = null;
      const parentDiv = document.getElementById(targetId);

      if (parentDiv) {
        // iframe要素を探す（少し待つ必要がある）
        const checkForIframe = () => {
          const iframe = parentDiv.querySelector('iframe');
          if (iframe) {
            resizeObserver = new ResizeObserver(() => {
              const height = iframe.clientHeight;
              if (height > 0) {
                parentDiv.style.height = 'auto';
                parentDiv.style.overflow = 'visible';
              } else {
                parentDiv.style.height = '0px';
                parentDiv.style.overflow = 'hidden';
              }
            });
            resizeObserver.observe(iframe);
          } else {
            // iframeがまだない場合は少し待って再試行
            setTimeout(checkForIframe, 100);
          }
        };

        // 初期状態は高さ0
        parentDiv.style.height = '0px';
        parentDiv.style.overflow = 'hidden';
        
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
      if (
        searchBoxRef.current &&
        typeof searchBoxRef.current.destroy === "function"
      ) {
        searchBoxRef.current.destroy();
      }
    };
  }, [isScriptLoaded, siteId, targetId, queryFields, tracking]);

  return (
    <div id={targetId} className={`helpdog-search-container ${className}`} />
  );
};

export default HelpdogSearch;
