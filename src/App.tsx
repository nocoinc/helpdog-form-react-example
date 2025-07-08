import { useState } from "react";
import HelpdogSearch from "./HelpdogSearch";
import "./styles.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  services: string[];
  implementationMethod: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
}

type FormStep = 1 | 2 | 3;

export default function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    services: [],
    implementationMethod: "",
    subject: "",
    message: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: "フォーム", label: "フォーム機能について" },
    { value: "ヘルプセンター", label: "ヘルプセンター機能について" },
    { value: "ユーザー設定", label: "ユーザー設定について" },
    { value: "チーム設定", label: "チーム設定について" },
    { value: "プランと契約", label: "プランと契約について" },
  ];

  const serviceOptions = [
    { value: "アクセス制限", label: "アクセス制限" },
    { value: "エクスポート", label: "エクスポート機能" },
    { value: "一括操作", label: "一括操作機能" },
    { value: "デザイン", label: "デザインカスタマイズ機能" },
    { value: "独自ドメイン", label: "独自ドメイン機能" },
  ];

  const implementationMethods = [
    { value: "埋め込みタグ", label: "埋め込みタグで実装" },
    { value: "JavaScript", label: "JavaScriptで実装" },
    { value: "React", label: "Reactで実装" },
    { value: "Vue", label: "Vueで実装" },
    { value: "WordPress", label: "WordPressで実装" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "agreeToTerms") {
        setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
      } else if (name === "services") {
        setFormData((prev) => ({
          ...prev,
          services: checked
            ? [...prev.services, value]
            : prev.services.filter((service) => service !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = (): boolean => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("必須項目をすべて入力してください。");
      return false;
    }
    if (!formData.agreeToTerms) {
      alert("利用規約に同意してください。");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // 送信処理のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCurrentStep(3);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      services: [],
      implementationMethod: "",
      subject: "",
      message: "",
      agreeToTerms: false,
    });
    setCurrentStep(1);
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
        <span className="step-number">1</span>
        <span className="step-label">入力</span>
      </div>
      <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
        <span className="step-number">2</span>
        <span className="step-label">確認</span>
      </div>
      <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
        <span className="step-number">3</span>
        <span className="step-label">完了</span>
      </div>
    </div>
  );

  const renderInputForm = () => (
    <form className="contact-form">
      <div className="form-section">
        <h3>基本情報</h3>
        <div className="form-group">
          <label htmlFor="name">お名前 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">電話番号 *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

      </div>

      <div className="form-section">
        <h3>お問い合わせ内容</h3>
        <div className="form-group">
          <label>お問い合わせ種別</label>
          <div className="radio-group">
            {inquiryTypes.map((type) => (
              <label key={type.value} className="radio-label">
                <input
                  type="radio"
                  name="inquiryType"
                  value={type.value}
                  checked={formData.inquiryType === type.value}
                  onChange={handleInputChange}
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>関連する機能（複数選択可）</label>
          <div className="checkbox-group">
            {serviceOptions.map((service) => (
              <label key={service.value} className="checkbox-label">
                <input
                  type="checkbox"
                  name="services"
                  value={service.value}
                  checked={formData.services.includes(service.value)}
                  onChange={handleInputChange}
                />
                {service.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="implementationMethod">実装方法</label>
          <select
            id="implementationMethod"
            name="implementationMethod"
            value={formData.implementationMethod}
            onChange={handleInputChange}
          >
            <option value="">選択してください</option>
            {implementationMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">件名</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">メッセージ</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
          />
        </div>

        {/* Helpdog検索ボックス - メッセージと件名の内容に基づいて検索 */}
        <div className="helpdog-form-group">
          <label>関連するヘルプ記事</label>
          <p className="help-text">入力内容に関連する記事が表示されます</p>
          <HelpdogSearch
            siteId="01JPVM5ZPX7E96GTDF9S3W1MS9"
            queryFields="#subject,#message,input[name='inquiryType'],input[name='services'],#implementationMethod"
            className="helpdog-search-box"
            tracking={{
              form_id: "contact-form",
              form_name: "お問い合わせフォーム",
              hosting_type: "external",
            }}
          />
        </div>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            利用規約に同意する *
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleNext} className="next-btn">
          確認画面へ進む
        </button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="confirmation-content">
      <h3>入力内容の確認</h3>
      <p>以下の内容で送信してよろしいですか？</p>

      <div className="confirmation-section">
        <h4>基本情報</h4>
        <dl className="confirmation-list">
          <dt>お名前</dt>
          <dd>{formData.name}</dd>
          <dt>メールアドレス</dt>
          <dd>{formData.email}</dd>
          <dt>電話番号</dt>
          <dd>{formData.phone}</dd>
        </dl>
      </div>

      <div className="confirmation-section">
        <h4>お問い合わせ内容</h4>
        <dl className="confirmation-list">
          <dt>お問い合わせ種別</dt>
          <dd>
            {
              inquiryTypes.find((type) => type.value === formData.inquiryType)
                ?.label
            }
          </dd>
          <dt>関連する機能</dt>
          <dd>
            {formData.services.length > 0
              ? formData.services
                  .map(
                    (service) =>
                      serviceOptions.find((opt) => opt.value === service)?.label
                  )
                  .join(", ")
              : "なし"}
          </dd>
          <dt>実装方法</dt>
          <dd>
            {
              implementationMethods.find((method) => method.value === formData.implementationMethod)
                ?.label
            }
          </dd>
          <dt>件名</dt>
          <dd>{formData.subject}</dd>
          <dt>メッセージ</dt>
          <dd className="message-preview">{formData.message}</dd>
        </dl>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleBack} className="back-btn">
          戻る
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="completion-content">
      <div className="success-icon">✓</div>
      <h3>送信完了</h3>
      <p>お問い合わせありがとうございました。</p>
      <p>確認次第、ご連絡いたします。</p>

      <div className="completion-info">
        <p>
          <strong>受付番号:</strong>{" "}
          {Math.random().toString(36).substring(2, 11).toUpperCase()}
        </p>
        <p>
          <strong>送信日時:</strong> {new Date().toLocaleString("ja-JP")}
        </p>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleReset} className="reset-btn">
          新しいお問い合わせを作成
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="form-container">
        <h1>お問い合わせフォーム</h1>
        <p>ご質問やご相談がございましたら、お気軽にお問い合わせください。</p>

        {renderStepIndicator()}

        {currentStep === 1 && renderInputForm()}
        {currentStep === 2 && renderConfirmation()}
        {currentStep === 3 && renderComplete()}
      </div>
    </div>
  );
}
