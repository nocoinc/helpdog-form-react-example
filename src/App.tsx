import { useState } from "react";
import HelpdogSearch from "./HelpdogSearch";
import "./styles.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  services: string[];
  prefecture: string;
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
    prefecture: "",
    subject: "",
    message: "",
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: "general", label: "一般的なお問い合わせ" },
    { value: "support", label: "サポート・技術的問題" },
    { value: "billing", label: "料金・お支払いについて" },
    { value: "feedback", label: "ご意見・ご要望" }
  ];

  const serviceOptions = [
    { value: "basic", label: "基本プラン" },
    { value: "premium", label: "プレミアムプラン" },
    { value: "enterprise", label: "エンタープライズプラン" },
    { value: "consulting", label: "コンサルティング" }
  ];

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "agreeToTerms") {
        setFormData(prev => ({ ...prev, agreeToTerms: checked }));
      } else if (name === "services") {
        setFormData(prev => ({
          ...prev,
          services: checked 
            ? [...prev.services, value]
            : prev.services.filter(service => service !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = (): boolean => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("必須項目をすべて入力してください。");
      return false;
    }
    if (!formData.inquiryType) {
      alert("お問い合わせ種別を選択してください。");
      return false;
    }
    if (!formData.prefecture) {
      alert("都道府県を選択してください。");
      return false;
    }
    if (!formData.subject || !formData.message) {
      alert("件名とメッセージを入力してください。");
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
      prefecture: "",
      subject: "",
      message: "",
      agreeToTerms: false
    });
    setCurrentStep(1);
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <span className="step-number">1</span>
        <span className="step-label">入力</span>
      </div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <span className="step-number">2</span>
        <span className="step-label">確認</span>
      </div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
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

        <div className="form-group">
          <label htmlFor="prefecture">都道府県 *</label>
          <select
            id="prefecture"
            name="prefecture"
            value={formData.prefecture}
            onChange={handleInputChange}
            required
          >
            <option value="">選択してください</option>
            {prefectures.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3>お問い合わせ内容</h3>
        <div className="form-group">
          <label>お問い合わせ種別 *</label>
          <div className="radio-group">
            {inquiryTypes.map(type => (
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
          <label>関心のあるサービス（複数選択可）</label>
          <div className="checkbox-group">
            {serviceOptions.map(service => (
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
          <label htmlFor="subject">件名 *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">メッセージ *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            required
          />
        </div>

        {/* Helpdog検索ボックス - メッセージと件名の内容に基づいて検索 */}
        <div className="form-group">
          <label>関連するヘルプ記事</label>
          <p className="help-text">入力内容に関連する記事が表示されます</p>
          <HelpdogSearch
            siteId="01JMEKJXW7C8VCR2ZYN5C67QB8"
            queryFields="#subject,#message,input[name='inquiryType']:checked"
            className="helpdog-search-box"
            tracking={{
              form_id: "contact-form",
              form_name: "お問い合わせフォーム",
              hosting_type: "external"
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
          <dt>都道府県</dt>
          <dd>{formData.prefecture}</dd>
        </dl>
      </div>

      <div className="confirmation-section">
        <h4>お問い合わせ内容</h4>
        <dl className="confirmation-list">
          <dt>お問い合わせ種別</dt>
          <dd>{inquiryTypes.find(type => type.value === formData.inquiryType)?.label}</dd>
          <dt>関心のあるサービス</dt>
          <dd>
            {formData.services.length > 0 
              ? formData.services.map(service => 
                  serviceOptions.find(opt => opt.value === service)?.label
                ).join(", ")
              : "なし"
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
        <p><strong>受付番号:</strong> {Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
        <p><strong>送信日時:</strong> {new Date().toLocaleString('ja-JP')}</p>
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
