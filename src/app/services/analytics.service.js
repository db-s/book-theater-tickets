const { Ticket } = require('../models/schemas');
const { DbHelper } = require('../lib');

class AnalyticsService {
    static MONTHS = [,
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    static async getVisitorCountByDbAggregation(startDate, endDate) {
        try {
            if (!startDate || !endDate) {
                throw new Error('Start and end date is required.');
            }

            const visitorCount = await Ticket.aggregate([
                {
                    $match: { performanceTime: { $gte: new Date(startDate), $lte: new Date(endDate) } }
                },
                {
                    $group: { _id: { month: { $month: '$performanceTime' } }, summaryVisits: { $sum: 1 } }
                },
                {
                    $sort: { "_id.month": 1 }
                },
                {
                    $addFields: {
                        month: {
                            $let: {
                                vars: { monthsInString: this.MONTHS },
                                in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] }
                            }
                        }
                    }
                },
                {
                    $project: { _id: 0, month: 1, summaryVisits: 1 }
                }
            ]);
            return { visitorCount };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getVisitorCountByJSAlgo(startDate, endDate) {
        try {
            if (!startDate || !endDate) {
                throw new Error('Start and end date is required.');
            }

            let visitorCount = [];
            const visitors = await Ticket
                .find({
                    performanceTime: { $gte: new Date(startDate), $lte: new Date(endDate) }
                })
                .sort({
                    performanceTime: 1
                });

            visitors.map(visitor => {
                const monthName = this.MONTHS[new Date(visitor.performanceTime).getMonth() + 1];
                const matchIdx = visitorCount.findIndex(i => i.month === monthName);

                if (matchIdx > -1) {
                    visitorCount[matchIdx].summaryVisits++;
                } else {
                    visitorCount.push({
                        month: monthName,
                        summaryVisits: 1,
                    });
                }
            });

            return { visitorCount };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getEarningByDbAggregation(startDate, endDate) {
        try {
            const earning = await Ticket.aggregate([
                {
                    $match: { performanceTime: { $gte: new Date(startDate), $lte: new Date(endDate) } }
                },
                {
                    $group: { _id: { month: { $month: '$performanceTime' } }, summaryProfit: { $sum: '$ticketPrice' } }
                },
                {
                    $sort: { "_id.month": 1 }
                },
                {
                    $addFields: {
                        month: {
                            $let: {
                                vars: { monthsInString: this.MONTHS },
                                in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] }
                            }
                        }
                    }
                },
                {
                    $project: { _id: 0, month: 1, summaryProfit: 1 }
                }
            ]);
            return { earning };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getEarningByJSAlgo(startDate, endDate) {
        try {
            if (!startDate || !endDate) {
                throw new Error('Start and end date is required.');
            }

            let earning = [];
            const earningList = await Ticket
                .find({
                    performanceTime: { $gte: new Date(startDate), $lte: new Date(endDate) }
                })
                .sort({
                    performanceTime: 1
                });

            earningList.map(earningData => {
                const monthName = this.MONTHS[new Date(earningData.performanceTime).getMonth() + 1];
                const matchIdx = earning.findIndex(i => i.month === monthName);

                if (matchIdx > -1) {
                    earning[matchIdx].summaryProfit += earningData.ticketPrice;
                } else {
                    earning.push({
                        month: monthName,
                        summaryProfit: earningData.ticketPrice,
                    });
                }
            });

            return { earning };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }
}

module.exports = AnalyticsService;
