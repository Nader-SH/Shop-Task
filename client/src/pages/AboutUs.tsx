import React from 'react';
import { Layout, Typography } from 'antd';
import './AboutUs.css'; // Optional custom styling

const { Title, Paragraph } = Typography;

const AboutUs: React.FC = () => {
    return (
        <div className="about-us-container">
            <Title className="about-us-title">About Us</Title>
            <div className="about-us-content">
                <Paragraph className="about-us-paragraph">
                    Welcome to our platform. We are a committed team of professionals dedicated to providing our customers with premium products and exceptional service. Our focus is on delivering unparalleled value with every interaction.
                </Paragraph>

                <Paragraph className="about-us-paragraph">
                    At the core of our mission is the commitment to offer high-quality products at competitive prices, ensuring a seamless and rewarding shopping experience. We continuously strive to exceed customer expectations by upholding the highest standards of excellence.
                </Paragraph>

                <Paragraph className="about-us-paragraph">
                    Whether you are seeking the latest innovations or carefully curated selections, our team works relentlessly to source and deliver the best items tailored to your needs. We pride ourselves on maintaining a dynamic and updated inventory that reflects the changing trends and demands of our valued customers.
                </Paragraph>

                <Paragraph className="about-us-paragraph">
                    We are grateful for the trust and loyalty of our customers. Our team remains committed to providing outstanding products and services for years to come. Thank you for choosing us as your preferred platform, and we look forward to continuing to serve you with excellence.
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUs;
