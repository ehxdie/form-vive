import React, { useState } from "react";

interface Step1FormProps {
    onSubmit: (data: any) => void;
    loading?: boolean;
}

const Step1Form = ({ onSubmit, loading }: Step1FormProps) => {
    const [formData, setFormData] = useState({
        productName: "",
        problem: "",
        audience: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Feedback Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        required
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="e.g., Noise Cancelling Headphones"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    />
                </div>

                {/* Problem Solved */}
                <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
                        What problem does this product solve?
                    </label>
                    <textarea
                        name="problem"
                        id="problem"
                        rows={4}
                        required
                        value={formData.problem}
                        onChange={handleChange}
                        placeholder="Describe the core problem your product addresses..."
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    />
                </div>

                {/* Target Audience */}
                <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                        Target Audience
                    </label>
                    <select
                        name="audience"
                        id="audience"
                        required
                        value={formData.audience}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    >
                        <option value="">-- Select Audience --</option>
                        <option value="students">Students</option>
                        <option value="professionals">Working Professionals</option>
                        <option value="creators">Content Creators</option>
                        <option value="general">General Public</option>
                    </select>
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Feedback →"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1Form;