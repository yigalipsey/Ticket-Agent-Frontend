import { AccessibilityStatement } from "@/components/accessibility";

export const metadata = {
    title: "הצהרת נגישות - TicketAgent",
    description:
        "הצהרת נגישות של TicketAgent - עמידה בתקן ישראלי 5568 ו-WCAG 2.1 Level AA",
};

export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-responsive">
                <AccessibilityStatement />
            </div>
        </div>
    );
}
