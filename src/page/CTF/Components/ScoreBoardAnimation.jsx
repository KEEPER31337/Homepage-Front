import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

//api
import ctfAPI from 'API/v1/ctf';

const ScoreBoardAnimation = ({ member }) => {
  const [FirstRank, setFirstRank] = useState([]);
  const [SecondRank, setSecondRank] = useState([]);
  const [ThirdRank, setThirdRank] = useState([]);

  useEffect(() => {
    ctfAPI
      .getRanking({
        token: member.token,
        page: 0,
        size: 3,
        ctfId: 2,
      })
      .then((data) => {
        if (data.success) {
          setFirstRank(data.page.content[0]);
          setSecondRank(data.page.content[1]);
          setThirdRank(data.page.content[2]);
        }
      });
  }, []);

  return (
    <div className="h-auto md:h-[375px] w-full  lg:w-2/5 flex flex-col    dark:bg-darkPoint content-end items-end justify-end justify-items-center">
      {/* 그래프 애니메이션 */}
      <div className="flex flex-row  border-4 border-amber-400 dark:border-darkPoint w-full h-full  content-end items-end justify-center justify-items-center">
        <div className="flex  pl-12  w-4/12 flex-col place-content-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                },
              }),
              hidden: { opacity: 0 },
            }}
          >
            <div className="dark:text-white mb-2">
              {SecondRank.name === null ? '' : SecondRank.name}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }),
              hidden: { opacity: 0 },
            }}
            className="bg-amber-300 dark:bg-purple-200 w-full h-2"
          ></motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                height: 130,
                opacity: 1,

                transition: {
                  type: 'spring',
                  stiffness: 100,
                  duration: 1,
                  delay: 0.2,
                },
              }),
              hidden: { opacity: 0, height: 0 },
            }}
            className="dark:bg-darkPoint w-full flex"
          >
            <div className="bg-amber-400 dark:bg-purple-100 flex w-1/12"></div>
            <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
            <div className="bg-amber-300 dark:bg-purple-300 flex w-8/12"></div>
            <div className="bg-amber-500 dark:bg-purple-400 flex w-2/12"></div>
          </motion.div>
        </div>
        <div className="flex pt-8 px-5 w-4/12 flex-col place-content-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                },
              }),
              hidden: { opacity: 0 },
            }}
          >
            <div className="dark:text-white mb-2">
              {FirstRank.name === null ? '' : FirstRank.name}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }),
              hidden: { opacity: 0 },
            }}
            className="bg-amber-300 dark:bg-purple-200 w-full h-2"
          ></motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                height: 200,
                opacity: 1,

                transition: {
                  type: 'spring',
                  stiffness: 100,
                  duration: 1,
                  delay: 0.3,
                },
              }),
              hidden: { opacity: 0, height: 0 },
            }}
            className="dark:bg-darkPoint w-full flex"
          >
            <div className="bg-amber-400 dark:bg-purple-100 flex w-1/12"></div>
            <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
            <div className="bg-amber-300 dark:bg-purple-300 flex w-8/12"></div>
            <div className="bg-amber-500 dark:bg-purple-400 flex w-2/12"></div>
          </motion.div>
        </div>
        <div className="flex pr-12  w-4/12 flex-col place-content-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                },
              }),
              hidden: { opacity: 0 },
            }}
          >
            <div className="dark:text-white mb-2">
              {ThirdRank.name === null ? '' : ThirdRank.name}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }),
              hidden: { opacity: 0 },
            }}
            className="bg-amber-300 dark:bg-purple-200 w-full h-2"
          ></motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: () => ({
                height: 70,
                opacity: 1,

                transition: {
                  type: 'spring',
                  stiffness: 200,
                  duration: 1,
                },
              }),
              hidden: { opacity: 0, height: 0 },
            }}
            className="dark:bg-darkPoint w-full flex"
          >
            <div className="bg-amber-400 dark:bg-purple-100 flex w-1/12"></div>
            <div className="bg-amber-200 dark:bg-purple-200 flex w-1/12"></div>
            <div className="bg-amber-300 dark:bg-purple-300 flex w-8/12"></div>
            <div className="bg-amber-500 dark:bg-purple-400 flex w-2/12"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ScoreBoardAnimation);
