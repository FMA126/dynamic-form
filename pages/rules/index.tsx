import {
  ArrowLeftIcon,
  InformationCircleIcon,
  PlayCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

const conditionsApi = () => [
  { id: 0, name: "Family Status is New" },
  { id: 1, name: "Family Status is Returning" },
  { id: 2, name: "Is Business Owner" },
  { id: 3, name: "Family did not file US Taxes" },
];

const actionsApi = () => [
  { id: 0, name: "Business Tax Documents", type: "document" },
  { id: 1, name: "W2 - Parent A (Previous Year)", type: "document" },
];

type Condition = { expression: string; conditionName: string };
type Action = { document: string; documentDescription: string };

export default function Advanced() {
  const [conditionList, setConditionList] = useState<Condition[]>([]);
  const [actionList, setActionList] = useState<Action[]>([]);
  const conditions = conditionsApi();
  const actions = actionsApi();

  const handleConditionSelectChange = (
    e: any,
    item: Condition,
    idx: number
  ) => {
    setConditionList((prevList) => {
      return [
        ...prevList.slice(0, idx),
        { expression: item.expression, conditionName: e.target.value },
        ...prevList.slice(idx + 1),
      ];
    });
  };
  const handleActionSelectChange = (e: any, item: Action, idx: number) => {
    console.log(e.target.value, item, idx);
    setActionList((prevList) => {
      return [
        ...prevList.slice(0, idx),
        { document: e.target.value, documentDescription: "" },
        ...prevList.slice(idx + 1),
      ];
    });
  };

  const handleAddCondition = () => {
    setConditionList((prevConditions) => [
      ...prevConditions,
      { expression: "if", conditionName: "" },
    ]);
  };
  const handleAddAction = () => {
    setActionList((prevActions) => [
      ...prevActions,
      { document: "", documentDescription: "" },
    ]);
  };
  const handleDeleteCondition = (idx: number) => {
    setConditionList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
  };
  const handleDeleteAction = (idx: number) => {
    setActionList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
  };

  const joinClassNames = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center justify-between p-4 border-b border-solid border-grey-500">
        <div className="flex items-center gap-4">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          <div>Advanced</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 border-solid rounded-xl py-2 px-4">
            Cancel
          </button>
          <button
            className={joinClassNames(
              conditionList.length === 0 ||
                conditionList.find((c) => c.conditionName === "") ||
                actionList.length === 0 ||
                actionList.find((a) => a.document === "")
                ? "bg-gray-800"
                : "bg-purple-800",
              "border border-purple-800 border-solid rounded-xl text-white py-2 px-4"
            )}
            disabled={conditionList.length === 0}
          >
            Save and Enable Rule
          </button>
        </div>
      </nav>
      <div className="px-10">
        <div className="border border-solid border-grey-500 rounded-xl shadow-sm">
          <div className="p-4 flex items-center gap-4 border-b-2 border-b-solid">
            <PlayCircleIcon className="h-8 w-8 text-purple-800 bg-white rounded-full" />
            <div>Conditions</div>
          </div>

          {conditionList.map(
            (conditionItem, conditionItemIdx, conditionArray) => (
              <div
                className="py-2 px-8 flex gap-12"
                key={Math.random() * conditionItemIdx}
              >
                <div>{conditionItem?.expression}</div>
                <select
                  value={conditionItem.conditionName}
                  onChange={(e) =>
                    handleConditionSelectChange(
                      e,
                      conditionItem,
                      conditionItemIdx
                    )
                  }
                  className="border border-solid border-gray-200 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
                >
                  <option value="">select</option>
                  {conditions.map((condition, conditionIdx) => (
                    <option
                      key={`${condition}-${conditionIdx}`}
                      value={condition.name}
                    >
                      {condition.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDeleteCondition(conditionItemIdx)}
                  className="p-2 border border-solid border rounded-lg"
                >
                  <TrashIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            )
          )}

          <div className="px-24 pb-6">
            <button
              onClick={handleAddCondition}
              className="font-semibold text-purple-800"
            >
              Add Condition
            </button>
          </div>
          <div className="py-4 px-4 flex items-center bg-gray-50 gap-4">
            <InformationCircleIcon className="h-6 w-8 text-gray-400" />
            <div className="text-gray-500">
              Given conditions match with x applicants.
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
        <div className="border border-solid border-grey-500 rounded-xl shadow-sm">
          <div className="p-4 flex items-center gap-4 border-b-2 border-b-solid">
            <PlayCircleIcon className="h-8 w-8 text-green-400 bg-white rounded-full" />
            <div>Actions</div>
          </div>
          {actionList.map((actionItem, actionItemIdx, actionArray) => (
            <div
              key={Math.random() * actionItemIdx}
              className="py-2 px-24 flex gap-2"
            >
              <select
                value={actionItem.document}
                onChange={(e) =>
                  handleActionSelectChange(e, actionItem, actionItemIdx)
                }
                className="border border-solid border-gray-200 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
              >
                <option value="" disabled>
                  select
                </option>
                {actions.map((action, actionIdx) => (
                  <option key={`${action}-${actionIdx}`} value={action.name}>
                    {action.name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Description of Document"
                className="border border-solid border-gray-200 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-purple-800 w-96"
              />
              <button
                onClick={() => handleDeleteAction(actionItemIdx)}
                className="p-2 border border-solid border rounded-lg"
              >
                <TrashIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          ))}
          <div className="px-24 pb-6">
            <button
              onClick={handleAddAction}
              className="font-semibold text-purple-800"
            >
              Create document request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
